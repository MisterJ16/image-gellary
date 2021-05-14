export const getResponse = async (requestUrl: string) => {
    try {
        const response = await fetch(requestUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response && response.ok) {
            return await response.json();
        } else {
            const errorPromise = await new Promise((_, reject) => {
                reject(`Error status: ${response.status}`);
            });
            return errorPromise;
        }
    } catch (err) {
        const errorPromise = await new Promise((_, reject) => {
            reject(`Request error!: ${err}`);
        });
        return errorPromise;
    }
};
