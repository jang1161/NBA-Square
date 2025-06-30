import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthCallback() {
	const navigate = useNavigate();
	const isCalled = useRef(false);

	useEffect(() => {
		if (isCalled.current) return;
		isCalled.current = true;

		const hash = window.location.hash;
		const params = new URLSearchParams(hash.substring(1));
		const accessToken = params.get("access_token");
		const idToken = params.get("id_token");

		if (accessToken) {
			console.log("Access Token:", accessToken);
			localStorage.setItem("access_token", accessToken);

			const userInfo = parseJwt(idToken);
			if (userInfo) {
				localStorage.setItem("user_email", userInfo.email || "");
				localStorage.setItem("user_name", userInfo.name || "");
				localStorage.setItem("user_picture", userInfo.picture || "");
			}

			console.log(userInfo);
			handleBackendLogin(userInfo.sub, userInfo.name, userInfo.email);
			navigate("/");
			setTimeout(() => {
				window.location.reload();
		}, 100);
		} else {
			alert("로그인 실패");
		}
	}, [navigate]);

	function parseJwt(token) {
		try {
			const base64Url = token.split('.')[1];
			const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			const binaryData = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
			const json = new TextDecoder().decode(binaryData);
			return JSON.parse(json);
		} catch (e) {
			console.error("JWT 파싱 실패:", e);
			return null;
		}
	}

	async function handleBackendLogin(externalId, username, email) {
		try {
			const response = await fetch("http://localhost:8080/user/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ externalId, username, email})
			});

			if (!response.ok) throw new Error("로그인 실패");

			const user = await response.json();
			localStorage.setItem("user_id", user.id);
			localStorage.setItem("token", user.token);

			console.log("유저 로그인 성공:", user);
		} catch (error) {
			console.error("로그인 중 오류:", error);
			alert("로그인 처리 중 문제가 발생했습니다.");
		}
	}

	return <div>로그인 중입니다...</div>;
}
