export const parsePath = (path: string) => {
    let data = {};

    path.slice(1)
        .split('&')
        .forEach((str) => {
            const key = str.split('=')[0];
            const value = str.split('=')[1];

            if (key === 'intermediateCities') {
                data = { ...data, [key]: [...value.split('@')] };
            } else {
                data = { ...data, [key]: value };
            }
        });

    return data;
};
