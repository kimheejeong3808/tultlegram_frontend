const backend_base_url = "http://127.0.0.1:5001"
const frontend_base_url = "http://127.0.0.1:5501"

// 비동기 함수 async 요청이 들어올 때만 작동
// fetch api 역시 함수가 호출되면 작동함
// signupData는 딕셔너리 형식으로, json데이터가 아니라면 제대로 서버로 전달되지 않음
// 그러므로 JSON.stringfy메서드로 변환해야함

async function handleSignin() {

    const signupData = {
        email: document.getElementById("floatingInput").value,
        password: document.getElementById('floatingPassword').value
    }

    const response = await fetch(`${backend_base_url}/signup`, {
        method: 'POST',
        body: JSON.stringify(signupData)
    }
    )
    console.log(response)

    response_json = await response.json()
    console.log(response_json)

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/login.html`);
    } else {
        alert(response.status)
    }
}

async function handleLogin() {
    console.log("handle login")

    const loginData = {
        email: document.getElementById("floatingInput").value,
        password: document.getElementById('floatingPassword').value
    }


    const response = await fetch(`${backend_base_url}/login`, {
        method: 'POST',
        body: JSON.stringify(loginData)
    }
    )


    console.log(response)
    // json형태로
    response_json = await response.json()
    console.log(response_json)

    // 백엔드에서 받은 토큰을 브라우저에 저장해줌
    localStorage.setItem("token", response_json.token)
    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/`);
    } else {
        alert(response.status)
    }

}



async function getName() {

    const response = await fetch(`${backend_base_url}/getuserinfo`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }
    )

    if (response.status == 200) {
        response_json = await response.json()
        console.log(response_json)
        return response_json.email
    }
    else {
        return null
    }

}



async function postArticle(title, content) {

    const articleData = {
        title: title,
        content: content,
    }
    console.log(articleData)

    const response = await fetch(`${backend_base_url}/article`, {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(articleData)
    }
    )


    response_json = await response.json()
    console.log(response_json)

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/`);
    } else {
        alert(response.status)
    }
}

async function getArticles() {
    const response = await fetch(`${backend_base_url}/article`, {
        method: 'GET',
    }
    )

    response_json = await response.json()
    return response_json.articles
}


function logout() {
    localStorage.removeItem("token")
    window.location.replace(`${frontend_base_url}/`);
}

function articleDetail(article_id) {
    console.log(article_id)
    const url = `${frontend_base_url}/article_detail.html?id=${article_id}`
    location.href = url
}


async function getArticleDetail(article_id) {
    const response = await fetch(`${backend_base_url}/article/${article_id}`, {
        method: 'GET',
    }
    )
    response_json = await response.json()
    console.log(response_json)

    return response_json.article

}

async function patchArticle(article_id, title, content) {

    const articleData = {
        "title": title,
        "content": content
    }

    const response = await fetch(`${backend_base_url}/article/${article_id}`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        },
        method: 'PATCH',
        body: JSON.stringify(articleData)
    })

    if (response.status == 200) {
        response_json = await response.json()
        return response_json

    } else {
        alert(response.status)
    }
}

async function deleteArticle() {
    const response = await fetch(`${backend_base_url}/article/${article_id}`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        },
        method: 'DELETE',
    }
    )

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/`);

    } else {
        alert(response.status)
    }
}





