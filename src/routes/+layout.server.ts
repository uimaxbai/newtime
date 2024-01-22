export async function load({ locals }) {
    console.log(locals.ip);
    return { ip: locals.ip }
}