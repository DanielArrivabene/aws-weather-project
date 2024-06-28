import { useState } from 'react';
import { TbSend } from 'react-icons/tb';

function EmailRegistration() {
  const [email, setEmail] = useState();
  const [city, setCity] = useState();
  const [text, setText] = useState(
    'Inscreva-se para receber a previsão do tempo diariamente por email'
  );

  function handleSend(email, city, e) {
    e.preventDefault();

    // Validate input data
    if (!email || !city) {
      console.error('Invalid input data');
      return;
    }

    const myData = { email, city };

    fetch(
      'https://t6k90g1hi7.execute-api.us-east-1.amazonaws.com/dev/registeremail',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myData)
      }
    )
      .then((response) => {
        if (response.status === 400) {
          setText('Email já cadastrado anteriormente.');
          throw new Error('Email já cadastrado anteriormente.');
        }
        if (response.status !== 200) {
          setText('Tente novamente.');
          throw new Error('Tente novamente.');
        }
        setText('Email cadastrado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  }

  return (
    <section className="container d-flex flex-column align-items-center">
      <article className="w-100 p-4 bg-primary rounded-2 search_container">
        <i className="text-light">{text}</i>
        <form className="w-100 d-flex flex-column gap-2 mt-3">
          <label htmlFor="city" className="fs-5 text-light">
            Email:
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className="rounded-3 p-2 border-0"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="city" className="fs-5 text-light">
            Cidade:
          </label>
          <div className="w-100 d-flex justify-content-between gap-3">
            <input
              type="text"
              name="city"
              id="city"
              className="rounded-3 p-2 border-0"
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              className="rounded-3 bg-info p-2 border-0 hover-zoom"
              onClick={(e) => handleSend(email, city, e)}
            >
              <TbSend />
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

export default EmailRegistration;
