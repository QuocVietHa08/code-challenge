import { useState , useMemo } from "react";
import "./App.css";
import { ArrowUpDown, XIcon } from "lucide-react";
import { TOKENS, Token } from "./utlis/constants";

const tokens = TOKENS;

function App() {
  const [fromToken, setFromToken] = useState<Token| null>(tokens[0]);
  const [toToken, setToToken] = useState<Token | null>(tokens[1]);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [swapSuccess, setSwapSuccess] = useState<boolean>(false);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);

  // Modal state
  const [showFromTokenModal, setShowFromTokenModal] = useState<boolean>(false);
  const [showToTokenModal, setShowToTokenModal] = useState<boolean>(false);

 
  // Calculate exchange rate
  const exchangeRate = useMemo(() => {
    if (!fromToken || !toToken || fromToken.price <= 0) return 0;
    return toToken.price / fromToken.price;
  }, [fromToken, toToken]);

  // Handle from amount change with improved transitions
  const handleFromAmountChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      if (document.startViewTransition) {
        // Use a single view transition for both state updates for smoother animation
        document.startViewTransition(() => {
          setFromAmount(value);
          
          if (value && exchangeRate) {
            const calculatedAmount = (parseFloat(value) * exchangeRate).toFixed(6);
            setToAmount(calculatedAmount);
          } else {
            setToAmount("");
          }
        });
      } else {
        // Fallback for browsers that don't support View Transitions API
        setFromAmount(value);
        if (value && exchangeRate) {
          const calculatedAmount = (parseFloat(value) * exchangeRate).toFixed(6);
          setToAmount(calculatedAmount);
        } else {
          setToAmount("");
        }
      }
    }
  };

  // Handle to amount change with improved transitions
  const handleToAmountChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      if (document.startViewTransition) {
        // Use a single view transition for both state updates for smoother animation
        document.startViewTransition(() => {
          setToAmount(value);
          
          if (value && exchangeRate) {
            const calculatedAmount = (parseFloat(value) / exchangeRate).toFixed(6);
            setFromAmount(calculatedAmount);
          } else {
            setFromAmount("");
          }
        });
      } else {
        // Fallback for browsers that don't support View Transitions API
        setToAmount(value);
        if (value && exchangeRate) {
          const calculatedAmount = (parseFloat(value) / exchangeRate).toFixed(6);
          setFromAmount(calculatedAmount);
        } else {
          setFromAmount("");
        }
      }
    }
  };

  // Swap tokens with smooth animation
  const handleSwapTokens = () => {
    setIsSwapping(true);
    
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        const temp = fromToken;
        setFromToken(toToken);
        setToToken(temp);
        setFromAmount(toAmount);
        setToAmount(fromAmount);
        
        // Reset swapping state after animation completes
        setTimeout(() => setIsSwapping(false), 600);
      });
    } else {
      const temp = fromToken;
      setFromToken(toToken);
      setToToken(temp);
      setFromAmount(toAmount);
      setToAmount(fromAmount);
      
      // Reset swapping state after a short delay
      setTimeout(() => setIsSwapping(false), 600);
    }
  };

  // Execute swap with improved animations
  const executeSwap = () => {
    if (!isFormValid) return;

    setIsSwapping(true);

    // Simulate API call
    setTimeout(() => {
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          setSwapSuccess(true);
          setIsSwapping(false);
        });
      } else {
        setSwapSuccess(true);
        setIsSwapping(false);
      }

      // Reset form after showing success message
      setTimeout(() => {
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            setSwapSuccess(false);
            setFromAmount("");
            setToAmount("");
          });
        } else {
          setSwapSuccess(false);
          setFromAmount("");
          setToAmount("");
        }
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

  // Function to get token icon with fallback
  const getTokenIcon = (token: Token) => {
    return token.imageUrl || `https://placehold.co/32x32/orange/white?text=${token.currency.charAt(0)}`;
  };

  // Close modals with animation when clicking outside
  const handleCloseModal = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setShowFromTokenModal(false);
        setShowToTokenModal(false);
      });
    } else {
      setShowFromTokenModal(false);
      setShowToTokenModal(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-h-screen p-4">
      <div className="swap-card">
        {/* From Token Section */}
        <div className="mb-1 text-sm text-gray-500 text-left ml-2">From</div>
        <div className="currency-input-container">
          <div className="flex justify-between items-center">
            <div
              className="currency-selector token-transition"
              onClick={() => {
                if (document.startViewTransition) {
                  document.startViewTransition(() => {
                    setShowFromTokenModal(true);
                  });
                } else {
                  setShowFromTokenModal(true);
                }
              }}
            >
              {fromToken && (
                <>
                  <img
                    src={getTokenIcon(fromToken)}
                    alt={fromToken.currency}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/32x32/orange/white?text=" +
                        fromToken.currency.charAt(0);
                    }}
                  />
                  <span className="font-medium">{fromToken.currency}</span>
                  <span className="ml-1">▼</span>
                </>
              )}
            </div>
            <input
              type="text"
              placeholder="0.00"
              className="currency-amount amount-transition"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
            />
          </div>
          {fromAmount ? (
            <div className="text-right text-sm text-gray-500 mt-2 balance-transition">
              Balance: 10.00 {fromToken?.currency}
            </div>
          ) : (
            <div className="text-right text-sm text-gray-500 mt-2 balance-transition">Available: 10.00 {fromToken?.currency}</div>
          )}
        </div>

        {/* Swap Button */}
        <div className={`arrow-icon ${isSwapping ? 'animate-spin' : ''}`} onClick={handleSwapTokens}>
          {isSwapping ? (
            <div className="animate-pulse">
              <ArrowUpDown size={20} />
            </div>
          ) : (
            <ArrowUpDown size={20} />
          )}
        </div>

        {/* To Token Section */}
        <div className="mb-1 text-sm text-gray-500 text-left ml-2">To</div>
        <div className="currency-input-container">
          <div className="flex justify-between items-center">
            <div
              className="currency-selector token-transition"
              onClick={() => {
                if (document.startViewTransition) {
                  document.startViewTransition(() => {
                    setShowToTokenModal(true);
                  });
                } else {
                  setShowToTokenModal(true);
                }
              }}
            >
              {toToken && (
                <>
                  <img
                    src={getTokenIcon(toToken)}
                    alt={toToken.currency}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/32x32/purple/white?text=" +
                        toToken.currency.charAt(0);
                    }}
                  />
                  <span className="font-medium">{toToken.currency}</span>
                  <span className="ml-1">▼</span>
                </>
              )}
            </div>
            <input
              type="text"
              placeholder="0.00"
              className="currency-amount amount-transition"
              value={toAmount}
              onChange={(e) => handleToAmountChange(e.target.value)}
            />
          </div>
          {toAmount ? (
            <div className="text-right text-sm text-gray-500 mt-2 balance-transition">
              Balance: 0.00 {toToken?.currency}
            </div>
          ) : (
            <div className="text-right text-sm text-gray-500 mt-2 balance-transition">Available: 0.00 {toToken?.currency}</div>
          )}
        </div>

        {/* Exchange Rate */}
        {fromToken && toToken && exchangeRate > 0 && (
          <div className="text-sm text-gray-500 mt-3 text-center balance-transition">
            1 {fromToken.currency} = {exchangeRate.toFixed(6)}{" "}
            {toToken.currency}
          </div>
        )}

        {/* Connect Wallet Button */}
        <button
          className="swap-button mt-6"
          onClick={executeSwap}
          disabled={!isFormValid || isSwapping}
        >
          {isSwapping && <span className="loading loading-spinner mr-2"></span>}
          {isSwapping ? "Swapping..." : "Swap"}
        </button>

        {/* Success Message with improved animation */}
        {swapSuccess && (
          <div className="toast toast-end">
            <div className="alert alert-success text-white font-bold animate-bounce-in">
              <div className="flex items-center">
                <span>
                  Swap successful! {fromAmount.toString().length > 4 ? `${fromAmount.toString().slice(0, 5)}...` : fromAmount} {fromToken?.currency} to {toAmount.toString().length > 4 ? `${toAmount.toString().slice(0, 5)}...` : toAmount}{" "}
                  {toToken?.currency}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* From Token Modal */}
      {showFromTokenModal && (
        <div className="currency-modal" onClick={handleCloseModal}>
          <div
            className="currency-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="currency-modal-header">
              <h3 className="text-lg font-bold">Select a token</h3>
              <button onClick={() => setShowFromTokenModal(false)}>
                <XIcon size={20} />
              </button>
            </div>
            <div className="currency-list">
              {tokens.map((token) => (
                <div
                  key={token.date}
                  className="currency-item"
                  onClick={() => {
                    if (document.startViewTransition) {
                      document.startViewTransition(() => {
                        setFromToken(token);
                        setShowFromTokenModal(false);
                      });
                    } else {
                      setFromToken(token);
                      setShowFromTokenModal(false);
                    }
                  }}
                >
                  <img
                    src={getTokenIcon(token)}
                    alt={token.currency}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/32x32/orange/white?text=" +
                        token.currency.charAt(0);
                    }}
                  />
                  <div>
                    <div className="font-medium">{token.currency}</div>
                    <div className="text-sm text-gray-500">
                      ${token.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* To Token Modal */}
      {showToTokenModal && (
        <div className="currency-modal" onClick={handleCloseModal}>
          <div
            className="currency-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="currency-modal-header">
              <h3 className="text-lg font-bold">Select a token</h3>
              <button onClick={() => setShowToTokenModal(false)}>
                <XIcon size={20} />
              </button>
            </div>
            <div className="currency-list">
              {tokens.map((token) => (
                <div
                  key={token.date}
                  className="currency-item"
                  onClick={() => {
                    if (document.startViewTransition) {
                      document.startViewTransition(() => {
                        setToToken(token);
                        setShowToTokenModal(false);
                      });
                    } else {
                      setToToken(token);
                      setShowToTokenModal(false);
                    }
                  }}
                >
                  <img
                    src={getTokenIcon(token)}
                    alt={token.currency}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/32x32/purple/white?text=" +
                        token.currency.charAt(0);
                    }}
                  />
                  <div>
                    <div className="font-medium">{token.currency}</div>
                    <div className="text-sm text-gray-500">
                      ${token.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
