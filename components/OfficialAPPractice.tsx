type OfficialAPPracticeProps = {
  examYear: string;
  questionNumber: string;
  skill: string;
  topic: string;
  description: string;
  sourceUrl: string;
};

export function OfficialAPPractice({
  examYear,
  questionNumber,
  skill,
  topic,
  description,
  sourceUrl,
}: OfficialAPPracticeProps) {
  return (
    <article className="official-ap-practice">
      <small>Official AP Practice</small>
      <h3>
        {examYear} Question {questionNumber}
      </h3>
      <p>{description}</p>
      <ul>
        <li>Skill: {skill}</li>
        <li>Topic: {topic}</li>
      </ul>
      <a className="button secondary" href={sourceUrl}>
        Open College Board Source
      </a>
    </article>
  );
}
