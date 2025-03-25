const mimeTypes: { [key: string]: string } = {
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.txt': 'text/plain',
    '.html': 'text/html',
    '.json': 'application/json',
    // Agrega más según sea necesario
};

export const getMimeType = (extension: string): string => {
    return mimeTypes[extension];
};