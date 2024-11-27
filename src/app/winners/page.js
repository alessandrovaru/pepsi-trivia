
import TableWithFilter from "./(components)/TableWithFilter";
import { getUserAnswers } from "./actions"

export default async function AdminTriviaPage() {
  const { data, error } = await getUserAnswers();
  
  return (
   <>
    <TableWithFilter data={data} error={error} />
   </>
  )
}