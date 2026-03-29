async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/servers/create-free', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'test-user-id-123',
        email: 'TestUser123@example.com',
        eggId: 1
      })
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e);
  }
}
test();
