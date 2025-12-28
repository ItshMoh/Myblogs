// API Base URL - uses env variable in production, Vite proxy in development
const API_BASE = import.meta.env.VITE_API_URL || '/api';

export interface Post {
    _id: string;
    content: string;
    timestamp: string;
    userId: string;
    userName: string;
}

export interface Article {
    _id: string;
    title: string;
    content: string;
    timestamp: string;
    author: string;
    wordCount: number;
}

// Posts API
export const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch(`${API_BASE}/posts`);
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
};

export const createPost = async (content: string): Promise<Post> => {
    const response = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    });
    if (!response.ok) {
        throw new Error('Failed to create post');
    }
    return response.json();
};

// Articles API
export const fetchArticles = async (): Promise<Article[]> => {
    const response = await fetch(`${API_BASE}/articles`);
    if (!response.ok) {
        throw new Error('Failed to fetch articles');
    }
    return response.json();
};

export const createArticle = async (title: string, content: string): Promise<Article> => {
    const response = await fetch(`${API_BASE}/articles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    });
    if (!response.ok) {
        throw new Error('Failed to create article');
    }
    return response.json();
};
