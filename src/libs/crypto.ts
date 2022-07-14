import { base64ToEmoji, emojiToBase64 } from 'base64-emoji-parser';
import AES from 'crypto-js/aes';
import UTF8 from 'crypto-js/enc-utf8';

interface encrypt {
  emoji: string;
  plain: string;
}

const encrypt = (str: string, secret: string) => {
  const bytes = AES.encrypt(str, secret);
  const encrypted = bytes.toString().slice(10);
  const emojiParsed = base64ToEmoji(encrypted);
  const decrypted = decrypt(emojiParsed, secret);
  if (decrypted === str) return emojiParsed;
  else throw new Error();
};

const decrypt = (str: string, secret: string) => {
  const emojiParsed = emojiToBase64(str);
  const bytes = AES.decrypt('U2FsdGVkX1' + emojiParsed, secret);
  const decrypted = bytes.toString(UTF8);
  if (decrypted) return decrypted;
  else throw new Error();
};

export { encrypt, decrypt };
