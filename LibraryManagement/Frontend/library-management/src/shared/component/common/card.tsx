import "./card.css";
interface CardProps {
  title: string;
}

export default function Card(props: React.PropsWithChildren<CardProps>) {
  return (
    <div className="card">
      <h3>{props.title}</h3>
      <div>{props.children}</div>
    </div>
  );
}
