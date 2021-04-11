/**
 * middleware CheckAuth
 * 로그인, 회원가입 페이지을 제외한 모든 페이지 시도 전에 실행하는 코드
*/

import store from '@/store'
import router from '@/router'

function checkAuth(to, from, next) {
	if (to.path === '/login' || to.path === '/register') {
		next()
	} else {
		// 토큰 유무 체크
		if (store.getters['Auth/getToken']) {
			// 사용자 정보 체크
			if (!store.getters['Auth/getUserInfo']) {
				store.dispatch('Auth/getUserInfo').then((res) => {
					next()
				}).catch(err => {
					console.error(err)
					router.push('/login')
				})
			} else {
				next()
			}
		} else {
			alert('로그인이 필요한 서비스입니다.')

			const returnUrl = encodeURIComponent(to.path)
			router.push('/login?return=' + returnUrl)
		}
	}
}

export {
	checkAuth
}
