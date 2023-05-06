function createSecretId() {
  return `secret_id:${Math.random()}`;
}

function ServerActions() {
  const secret = createSecretId();

  async function action(data: FormData) {
    'use server';
    console.log(data);
    console.log(secret);
  }

  return (
    <form action={action}>
      <input type='text' name='data' />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default ServerActions;
