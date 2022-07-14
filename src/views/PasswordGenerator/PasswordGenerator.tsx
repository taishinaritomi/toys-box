import { nanoid } from 'nanoid';
import { useState } from 'react';

export const PasswordGenerator = () => {
  const [passwords, setPasswords] = useState<string[]>([]);
  const [generateCount, setGenerateCount] = useState<number>(20);
  const [passwordLength, setPasswordLength] = useState<number>(14);

  const handleGenerate = () => {
    setPasswords([...Array(generateCount)].map(() => nanoid(passwordLength)));
  };

  return (
    <>
      <h1>Password Generator</h1>
      <div>
        <p>Generate:{generateCount}</p>
        <input
          onChange={(e) => setGenerateCount(e.currentTarget.valueAsNumber)}
          type='range'
          min={1}
          max={100}
          step={1}
          defaultValue={generateCount}
        />
      </div>

      <div>
        <p>Length:{passwordLength}</p>
        <input
          onChange={(e) => setPasswordLength(e.currentTarget.valueAsNumber)}
          type='range'
          min={5}
          max={30}
          step={1}
          defaultValue={passwordLength}
        />
      </div>

      <button onClick={handleGenerate}>generate</button>
      {passwords.map((password) => (
        <div key={password}>{password}</div>
      ))}
    </>
  );
};
