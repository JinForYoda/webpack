import styled from 'styled-components'
const StyledButton = styled.button`
	color: red;
	display: flex;
`

export default function Button() {
	const a = 1
	if (a === 1) console.log('da')

	return <StyledButton>Button</StyledButton>
}
