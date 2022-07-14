import { decrypt, encrypt } from './crypto';

describe('Crypto', () => {
  it('Crypto Base64', () => {
    const text = 'test';
    const password = 'password';
    const encrypted = encrypt(text, password);
    console.log(encrypted);
    const decrypted = decrypt(encrypted, password);
    expect(decrypted).toEqual(text);
  });

  it('Crypto Emoji', () => {
    const text = 'test';
    const password = 'password';
    const encrypted = encrypt(text, password);
    console.log(encrypted);
    const decrypted = decrypt(encrypted, password);
    expect(decrypted).toEqual(text);
  });
});
