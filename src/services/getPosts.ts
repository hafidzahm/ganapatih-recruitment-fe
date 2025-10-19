export default async function getPosts() {
  const response = await fetch(`feed?page=1&limit=10`);
  return response.json();
}
