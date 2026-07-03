const BASE_URL = "http://localhost:3000/api";

export const login = async (email: string, password: string) => {
    console.log(`[AUTH] Login attempt - email: ${email}`);
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.ok) {
        console.log("[AUTH] Login successful - cookie set by server");
    } else {
        console.log(`[AUTH] Login failed - ${data.message}`);
    }
    return data;
};

export const getMe = async () => {
    console.log("[AUTH] Checking session...");
    const res = await fetch(`${BASE_URL}/me`, {
        credentials: "include",
    });
    const data = await res.json();
    if (data.ok) {
        console.log("[AUTH] Session valid - access granted");
    } else {
        console.log("[AUTH] No session - redirecting to login");
    }
    return data;
};

export const uploadCSV = async (file: File) => {
    console.log(`[UPLOAD] Sending file - ${file.name} (${file.size} bytes)`);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
    });
    const data = await res.json();
    if (data.ok) {
        console.log(
            `[UPLOAD] Response received - ${data.data.success.length} success, ${data.data.errors.length} errors`,
        );
    } else {
        console.log(`[UPLOAD] Upload failed - ${data.message}`);
    }
    return data;
};

export const correctRow = async (data: {
    name: string;
    email: string;
    age: string;
}) => {
    console.log(`[CORRECTION] Sending row - `, data);
    const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.ok) {
        console.log(`[CORRECTION] Row inserted successfully - id: ${result.data.id}`);
    } else {
        console.log(`[CORRECTION] Validation failed - `, result.errors);
    }
    return result;
};
