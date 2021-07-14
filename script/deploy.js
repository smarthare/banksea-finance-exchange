require('dotenv').config()

const path = require('path')
const { NodeSSH } = require('node-ssh')

const REMOTE_DEPLOY_PATH = '/home/devops/banksy/banksy-finance-exchange/middleware'
const DOCKER_IMAGE_NAME = 'banksy_nginx'
const REMOTE_DEPLOY_PATH_INNER = `${REMOTE_DEPLOY_PATH}/ui`
const DIST_ARCH = './build'

const CONFIG = { host: process.env.SSH_HOST, username: process.env.SSH_USERNAME, password: process.env.SSH_PASSWORD }

function checkEnv() {
  let not_found = 0

  if (!process.env.SSH_HOST) {
    console.error('No SSH_HOST found in env.')
    not_found = 1
  }
  if (!process.env.SSH_USERNAME) {
    console.error('No SSH_USERNAME found in env.')
    not_found = 1
  }
  if (!process.env.SSH_PASSWORD) {
    console.error('No SSH_PASSWORD found in env.')
    not_found = 1
  }

  if (not_found) {
    console.log('Please add(if not exists) or modify .env file in root path. The content of file is according to .env.example file.')
    process.exit(-1)
  }
}

function connect(config) {
  let ssh = new NodeSSH()
  return ssh.connect(config).then(() => {
    console.log(`${ssh.connection.config.host} connect success`)
    return Promise.resolve(ssh)
  }).catch(e => {
    ssh.dispose()
    return Promise.reject(e)
  })
}

function clean(ssh) {
  let host = ssh.connection.config.host
  if (REMOTE_DEPLOY_PATH_INNER === '' || REMOTE_DEPLOY_PATH_INNER === '/') {
    ssh.dispose()
    return Promise.reject('be serious? rm -fr /* ')
  }
  return ssh.execCommand(`rm -fr ${REMOTE_DEPLOY_PATH_INNER}/`, { cwd: REMOTE_DEPLOY_PATH_INNER }).then(result => {
    if (result.stderr.length !== 0) {
      ssh.dispose()
      return Promise.reject(result.stderr)
    }
    console.log(`${host}:${REMOTE_DEPLOY_PATH_INNER} clean success`)
    return Promise.resolve(ssh)
  }).catch(() => {
    console.log('empty director, no need to clean')
    return Promise.reject()
    // if (e.toString().indexOf('No such file or directory') !== -1) {
    //   return Promise.resolve(ssh)
    // }
    // return Promise.reject(`clear error: ${e.toString()}`)
  })
}

function restart(ssh) {
  console.log('start to restart...')
  let host = ssh.connection.config.host
  return ssh.execCommand(`docker-compose -f ${REMOTE_DEPLOY_PATH}/docker-compose.yml restart ${DOCKER_IMAGE_NAME}`).then(result => {
    if (result.stderr.length !== 0) {
      ssh.dispose()
      return Promise.reject(result.stderr)
    }
    console.log(`${host}:${REMOTE_DEPLOY_PATH_INNER} restart success`)
    ssh.dispose()
    return Promise.resolve('success')
  }).catch(e => {
    if (e.toString().includes('Some networks were defined but are not used by any service')) {
      console.log(`${host}:${REMOTE_DEPLOY_PATH_INNER} restart success`)
      return Promise.resolve('success')
    } else {
      return Promise.reject(e)
    }
  })
}

function scp(ssh) {
  console.log('start to scp...')
  let host = ssh.connection.config.host
  // console.log(`${host} start to scp...`)
  return ssh.putDirectory(DIST_ARCH, REMOTE_DEPLOY_PATH_INNER, {
    recursive: true,
    concurrency: 1,
    validate: function(itemPath) {
      const baseName = path.basename(itemPath)
      return baseName.substr(0, 1) !== '.' && // do not allow dot files
        baseName !== 'node_modules' // do not allow node_modules
    },
  }).then(function(status) {
    console.log(`${host}:${REMOTE_DEPLOY_PATH_INNER} remote file transaction was`, status ? 'successful' : 'unsuccessful')
    // if( failed.length !==0 ) {
    //   console.log(`${host}:${REMOTE_DEPLOY_PATH_INNER} failed transfers`, failed.join(', '))
    // }
    console.log(`${host} scp success`)
    return Promise.resolve(ssh)
  })
}

async function main() {
  checkEnv()

  const ssh = await connect(CONFIG)

  clean(ssh)
    .then(ssh => {
      scp(ssh).then(restart)
    })
    .catch(() => {
      console.log('Clean error, reconnect.')
      connect(CONFIG)
        .then(scp)
        .then(restart, e => {
          console.log(`${CONFIG.host} deploy fail:${e}`)
        })
    })
    // .then(restart)
}


main()
