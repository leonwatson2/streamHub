const io = require('./index.js').io
const { redirectUri, clientId, clientSecret } = require('../config.json')
const { FOLLOWER_COUNT, NEW_FOLLOWER } = require('../Events')
const axios = require('axios')
const fs = require('fs')
// const {  } = require('../Events')

module.exports = function(socket){
	let oauthCode, refreshToken, accessToken, userId; 		
	// console.log('\x1bc'); //clears console
	console.log("Socket Id:" + socket.id);
	//User disconnects
	socket.on('disconnect', ()=>{
		console.log('disconnect')
	})
	
	socket.on('verification_code', (code)=>{
		oauthCode = code;
		getUserAccessToken(code).then(({ refresh_token, access_token })=>{
			refreshToken = refresh_token
			accessToken = access_token
			getUserId(accessToken).then( id =>{
				userId = id
				console.log("IDIDID", id)
			})
		}).catch(err=>{
			if(err.response.data.status == 400) {
				console.log("rever")
				socket.emit('reverify')
			}
		})
	})

	socket.on('get_followers', (cb) => {
		getUserFollows(userId, accessToken).then(( data )=> {
			if(data)
				cb(data)
			else cb([])
		})
		
	})

	watchStreamLabsFile('most_recent_follower.txt', (value)=>{
		socket.emit(NEW_FOLLOWER, value)
	},(err) => {
		console.log('error')
	})
	
	watchStreamLabsFile('session_follower_count.txt', (value)=>{
		socket.emit(FOLLOWER_COUNT, value)
	}, (err) => {
		console.log('error')
	})
}

function getUserFollows(userId, accessToken){
	const options = {
		headers: {
			'Client-ID':clientId,
		  	Authorization: 'OAuth ' + accessToken 
		}
	}
	return axios.get(`https://api.twitch.tv/helix/users/follows?to_id=${userId}`, options)
				.then((res)=>{
					const followers = res.data.data
					return Promise.all(followers.map(getUserById))
				}).catch(err=>{
					console.log("Followers", err)
				})
}
function getUserById(user){
	const id = user.from_id
	const options = {
		headers: {
			Accept: 'application/vnd.twitchtv.v5+json',
			'Client-ID':clientId
		}
	}
	return axios.get(`https://api.twitch.tv/kraken/users/${id}`, options)
		.then(res=>{
			return res.data
		}).catch(res=>{
			console.log(res)
		})
}
function getUserId(accessToken){
	const options = {
		headers: {
			'Client-ID':clientId,
		  	Authorization: 'OAuth ' + accessToken 
		}
	}
	return axios.get("https://api.twitch.tv/kraken/user", options).then(res=>{
		return res.data._id
	}).catch(err=>{
		console.log("GetUSerID",err)
	})
}
function getUserAccessToken(code){
	let requestUrl = 'https://id.twitch.tv/oauth2/token'
	requestUrl += `?client_id=${clientId}`
    requestUrl += `&client_secret=${clientSecret}`
    requestUrl += `&code=${code}`
    requestUrl += `&grant_type=authorization_code`
    requestUrl += `&redirect_uri=${redirectUri}`
	return axios.post(requestUrl).then((res)=>{
		return res.data
	}).catch(err=>{
		
		throw err
		
	})
}

function subscribeToUsersLatestFollow(id, ngrokUrl){

    const uri = "http://e28cfcfb.ngrok.io/webhooks/api"
    const options = {
        "hub.mode":"subscribe",
        "hub.topic":`https://api.twitch.tv/helix/users/follows?first=1&to_id=${id}`,
        "hub.callback": uri,
        "hub.lease_seconds":"864000",
        "hub.secret": 's3cRe7'
    }
    const headers = {
        'Client-ID': clientId
    }
    axios.post('https://api.twitch.tv/helix/webhooks/hub', options, { headers}).then(res=>{
        res
    }).catch(err=>{
        err
    })
    return {
        unsubscribe: () => {
            options['hub.mode'] = "unsubscribe"
            axios.post('https://api.twitch.tv/helix/webhooks/hub', options, { headers }).then(res=>{
                res
            }).catch(err=>{
                err
            })
        }
    }
}

function watchStreamLabsFile(fileName, successCb, failCb){
    getStreamLabsFileContents(fileName).then(successCb).catch(failCb)
    const streamLabelsPath = '/Users/ATJack/Documents/Work/Stream/StreamLabels';
    fs.watchFile(`${streamLabelsPath}/${fileName}`,
                { persistent: true}, 
                function (err, items) {
                    getStreamLabsFileContents(fileName).then(successCb).catch(failCb)
                });
}
function getStreamLabsFileContents(fileName){
    const streamLabelsPath = '/Users/ATJack/Documents/Work/Stream/StreamLabels';
    return new Promise((res, rej)=>{
        fs.readFile(`${streamLabelsPath}/${fileName}`,
                function(err, items) {
                    if(err){
                        rej(err)
                    }else{
                        res(items.toString());
                    }
                });
            })
}