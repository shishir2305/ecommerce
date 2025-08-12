import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PaypalButtonProps {
  amount: number;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

function PaypalButton({ amount, onSuccess, onError }: PaypalButtonProps) {
  return (
    <PayPalScriptProvider options={{ clientId: "test" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString(),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          if (actions.order) {
            return actions.order.capture().then(onSuccess);
          }
          return Promise.resolve();
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
}

export default PaypalButton;
