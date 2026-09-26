export function Tags({ items }: { items: readonly string[] }) {
  return <ul className="tag-list">{items.map((item) => <li className="tag" key={item}>{item}</li>)}</ul>;
}
