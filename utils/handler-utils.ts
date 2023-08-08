
export const redirectToAbsoluteOrRelative = (url: string) => {
    return new Response("", {
        status: 307,
        headers: { "Location": url },
    });
}
