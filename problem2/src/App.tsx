import { useState, useEffect, useMemo } from "react";
import "./App.css";
import { ArrowUpDownIcon } from "lucide-react";

interface Token {
  currency: string;
  price: number;
  date: string;
}

interface TokenWithUniquePrice extends Token {
  uniqueId: string;
}

function App() {
  const [fromToken, setFromToken] = useState<TokenWithUniquePrice | null>(null);
  const [toToken, setToToken] = useState<TokenWithUniquePrice | null>(null);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [tokens, setTokens] = useState<TokenWithUniquePrice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [swapSuccess, setSwapSuccess] = useState<boolean>(false);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);

  // Fetch token prices
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://interview.switcheo.com/prices.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch token prices");
        }
        const data: Token[] = await response.json();

        // Process tokens to create unique entries by currency
        const uniqueTokens = new Map<string, TokenWithUniquePrice>();
        console.log('data--', data)

        data.forEach((token) => {
          const uniqueId = `${token.currency}-${token.date}`;
          if (
            !uniqueTokens.has(token.currency) ||
            new Date(token.date) >
              new Date(uniqueTokens.get(token.currency)!.date)
          ) {
            uniqueTokens.set(token.currency, { ...token, uniqueId });
          }
        });

        const tokenArray = Array.from(uniqueTokens.values());
        setTokens(tokenArray);

        // Set default tokens
        if (tokenArray.length >= 2) {
          const ethToken = tokenArray.find((t) => t.currency === "ETH");
          const usdcToken = tokenArray.find((t) => t.currency === "USDC");

          setFromToken(ethToken || tokenArray[0]);
          setToToken(usdcToken || tokenArray[1]);
        }
      } catch (err) {
        setError("Failed to load token data. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, []);

  // Calculate exchange rate
  const exchangeRate = useMemo(() => {
    if (!fromToken || !toToken || fromToken.price <= 0) return 0;
    return toToken.price / fromToken.price;
  }, [fromToken, toToken]);

  // Handle from amount change
  const handleFromAmountChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFromAmount(value);

      if (value && exchangeRate) {
        const calculatedAmount = (parseFloat(value) * exchangeRate).toFixed(6);
        setToAmount(calculatedAmount);
      } else {
        setToAmount("");
      }
    }
  };

  // Handle to amount change
  const handleToAmountChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setToAmount(value);

      if (value && exchangeRate) {
        const calculatedAmount = (parseFloat(value) / exchangeRate).toFixed(6);
        setFromAmount(calculatedAmount);
      } else {
        setFromAmount("");
      }
    }
  };

  // Swap tokens
  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  // Execute swap
  const executeSwap = () => {
    if (!isFormValid) return;

    setIsSwapping(true);

    // Simulate API call
    setTimeout(() => {
      setSwapSuccess(true);
      setIsSwapping(false);

      // Reset form after showing success message
      setTimeout(() => {
        setSwapSuccess(false);
        setFromAmount("");
        setToAmount("");
      }, 3000);
    }, 1500);
  };

  // Form validation
  const isFormValid = useMemo(() => {
    return (
      fromToken !== null &&
      toToken !== null &&
      fromToken !== toToken &&
      fromAmount !== "" &&
      parseFloat(fromAmount) > 0 &&
      toAmount !== "" &&
      parseFloat(toAmount) > 0
    );
  }, [fromToken, toToken, fromAmount, toAmount]);

  // Get token image URL
  // const getTokenImageUrl = (currency: string) => {
  //   return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`;
  // };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="alert alert-error shadow-lg max-w-md">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">
            Swap Currencies
          </h2>

          {/* From Token Section */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">From</span>
              {fromAmount && (
                <span className="label-text-alt">
                  Balance: 10.00 {fromToken?.currency}
                </span>
              )}
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <select
                  className="select select-bordered w-full"
                  value={fromToken?.uniqueId || ''}
                  onChange={(e) => {
                    const selectedToken = tokens.find(token => token.uniqueId === e.target.value);
                    if (selectedToken) setFromToken(selectedToken);
                  }}
                >
                  <option value="" disabled>Select token</option>
                  {tokens.map((token) => (
                    <option key={token.uniqueId} value={token.uniqueId}>
                      {token.currency}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                placeholder="0.00"
                className="input input-bordered flex-1"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
              />
            </div>
            {fromToken && fromToken === toToken && (
              <label className="label">
                <span className="label-text-alt text-error">
                  Cannot swap to the same token
                </span>
              </label>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center my-2">
            <button className="btn btn-sm btn-ghost" onClick={handleSwapTokens}>
              <ArrowUpDownIcon size={17} />
            </button>
          </div>

          {/* To Token Section */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">To</span>
              {toAmount && (
                <span className="label-text-alt">
                  Balance: 0.00 {toToken?.currency}
                </span>
              )}
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <select
                  className="select select-bordered w-full"
                  value={toToken?.uniqueId || ''}
                  onChange={(e) => {
                    const selectedToken = tokens.find(token => token.uniqueId === e.target.value);
                    if (selectedToken) setToToken(selectedToken);
                  }}
                >
                  <option value="" disabled>Select token</option>
                  {tokens.map((token) => (
                    <option key={token.uniqueId} value={token.uniqueId}>
                      {token.currency}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                placeholder="0.00"
                className="input input-bordered flex-1"
                value={toAmount}
                onChange={(e) => handleToAmountChange(e.target.value)}
              />
            </div>
          </div>

          {/* Exchange Rate */}
          {fromToken && toToken && exchangeRate > 0 && (
            <div className="text-sm text-gray-500 mt-2">
              1 {fromToken.currency} = {exchangeRate.toFixed(6)}{" "}
              {toToken.currency}
            </div>
          )}

          {/* Swap Button */}
          <div className="justify-center mt-6">
            <button
              className={`btn btn-soft w-full ${
                !isFormValid ? "btn-disabled" : ""
              }`}
              onClick={executeSwap}
              disabled={!isFormValid || isSwapping}
            >
              {isSwapping && <span className="loading loading-spinner"></span>}
              {isSwapping ? "Swapping..." : "Swap"}
            </button>
          </div>

          {/* Success Message */}
          {swapSuccess && (
            <div className="alert alert-success shadow-lg mt-4">
              <div>
                <span>
                  Swap successful! {fromAmount} {fromToken?.currency} to{" "}
                  {toAmount} {toToken?.currency}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
