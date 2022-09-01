import App from '../src/App'
import { screen, render } from '@testing-library/react'
import { describe, test, expect } from 'vitest'

describe('inital test', () => {
  test("it should render 'Iniciando'", () => {
    render(<App/>)

    const hello = screen.queryByText('Iniciando...')
    expect(hello).toBeTruthy()
  })
})
