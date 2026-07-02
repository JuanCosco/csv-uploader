const BASE_URL = "http://localhost:3000/api";

export const login = async (email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });
    return res.json();
};

export const uploadCSV = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file);

    const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
    });
    return res.json();
};

export const correctRow = async (data: {
    name: string;
    email: string;
    age: string;
}) => {
    const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    })

    return res.json()
}