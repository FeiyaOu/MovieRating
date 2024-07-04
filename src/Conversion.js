import { useEffect, useState } from "react";
function Input({ query, setQuery, isLoading }) {
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(Number(e.target.value))}
        disabled={isLoading}
      />
    </div>
  );
}

function Selection({ value, onSelect, isLoading }) {
  return (
    <select value={value} onChange={onSelect} disabled={isLoading}>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="CAD">CAD</option>
      <option value="INR">INR</option>
    </select>
  );
}

function Output({ output, select2 }) {
  return (
    <div>
      <p>
        {output}
        {select2}
      </p>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("0");
  const [select1, setSelect1] = useState("USD");
  const [select2, setSelect2] = useState("EUR");
  const [output, setOutput] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  function handleSelect1(event) {
    setSelect1(event.target.value);
  }

  function handleSelect2(event) {
    setSelect2(event.target.value);
  }

  useEffect(
    function () {
      async function currencyConversion() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${query}&from=${select1}&to=${select2}`
        );
        const data = await res.json();
        const result = await data.rates;

        console.log(result);
        if (data.rates && data.rates[select2]) {
          setOutput(data.rates[select2]);
        } else {
          setOutput("0"); // Handle case where rate is not found
        }
        // setOutput(result[select2]);
        // setOutput(data.rates[select2]);
        setIsLoading(false);
      }
      if (select1 === select2) return setOutput(query);
      currencyConversion();
    },
    [query, select1, select2]
  );

  return (
    <div>
      <div>
        <Input query={query} setQuery={setQuery} isLoading={isLoading} />
        <Selection
          value={select1}
          onSelect={handleSelect1}
          isLoading={isLoading}
        />
        <Selection
          value={select2}
          onSelect={handleSelect2}
          isLoading={isLoading}
        />
      </div>
      <Output output={output} select2={select2} />
    </div>
  );
}
