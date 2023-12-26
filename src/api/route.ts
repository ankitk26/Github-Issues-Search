export async function GET(request: Request) {
  console.log("Hello");

  return new Response("Hello", {
    status: 200,
  });
}
