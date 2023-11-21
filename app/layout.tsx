interface Props extends React.PropsWithChildren {}

export default function RootLayout(props: Props) {
  const { children } = props;
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  );
}
