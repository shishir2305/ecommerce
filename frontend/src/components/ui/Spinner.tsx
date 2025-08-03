function Spinner({ size = 18, color = "#fff" }) {
  return (
    <span
      className="inline-block animate-spin rounded-full border-2 border-t-transparent"
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderTopColor: "transparent",
      }}
    />
  );
}

export default Spinner;
