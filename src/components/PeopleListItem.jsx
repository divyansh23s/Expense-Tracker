import PeopleListItem from "./PeopleListItem";
import Card from "./UI/Card";

export default function PeopleList({ person }) {
  return (
    <Card>
      <h3>People</h3>
      <ul>
        {person.map((person => (
          <PeopleListItem key={person} name={person} />
        )))}
      </ul>
    </Card>
  );
}