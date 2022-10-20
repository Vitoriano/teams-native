import { Container, Message } from "./styles";

type Props = {
  message: string
}

export function ListEmpty({ message }: Props) {
  return (
    <Container style={Container}>
      <Message style={Message}>
          { message }
      </Message>
    </Container>
  )
}