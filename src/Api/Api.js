const api = {
    baseUrl: 'https://blog.kata.academy/api',
    token: '',

    async getArticles(count = 0) {
        const response = await fetch(`${this.baseUrl}/articles?offset=${count}`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Server Error!');
        }
        const data = await response.json();

        return data;
    },

    async getArticle(slug) {
        const response = await fetch(`${this.baseUrl}/articles/${slug}`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Server Error!');
        }
        const data = await response.json();

        return data;
    },

    async createNewUserAccount(newUser) {
        const response = await fetch(`${this.baseUrl}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ user: newUser }),
        });
        const data = await response.json();

        if (!response.ok) {
            throw data.errors;
        }

        this.token = data.user.token;
        window.localStorage.setItem('token', this.token);

        return data;
    },

    async login(loginData) {
        const response = await fetch(`${this.baseUrl}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ user: loginData }),
        });
        const data = await response.json();

        if (!response.ok) {
            throw data.errors;
        }

        this.token = data.user.token;
        window.localStorage.setItem('token', this.token);

        return data;
    },

    async getCurrentUser() {
        const token = window.localStorage.getItem('token');

        if (!token) {
            throw new Error('Not found token');
        }

        const response = await fetch(`${this.baseUrl}/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();

        if (!response.ok) {
            throw data.errors;
        }

        this.token = data.user.token;
        window.localStorage.setItem('token', this.token);

        return data;
    },

    logOut() {
        this.token = '';
        window.localStorage.removeItem('token');
    },

    async editUserAccount(newUserData) {
        const response = await fetch(`${this.baseUrl}/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({ user: newUserData }),
        });
        const data = await response.json();

        if (!response.ok) {
            throw data.errors;
        }

        this.token = data.user.token;
        window.localStorage.setItem('token', this.token);

        return data;
    },

    async createArticle(articleData) {
        const response = await fetch(`${this.baseUrl}/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({ article: articleData }),
        });

        if (!response.ok) {
            throw new Error('Server Error!');
        }
        const data = await response.json();

        return data;
    },

    async updateArticle(articleData, slug) {
        const response = await fetch(`${this.baseUrl}/articles/${slug}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({ article: articleData }),
        });

        if (!response.ok) {
            throw new Error('Server Error!');
        }
        const data = await response.json();

        return data;
    },

    async deleteArticle(slug) {
        const response = await fetch(`${this.baseUrl}/articles/${slug}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Server Error!');
        }
    },

    async favoriteArticle(slug) {
        const response = await fetch(`${this.baseUrl}/articles/${slug}/favorite`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Server Error!');
        }

        const data = await response.json();

        return data;
    },

    async unfavoriteArticle(slug) {
        const response = await fetch(`${this.baseUrl}/articles/${slug}/favorite`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Server Error!');
        }

        const data = await response.json();

        return data;
    },
};

export default api;
