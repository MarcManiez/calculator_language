const Scanner = require('./scanner')
const Parser = require('./parser')

class Calculator {
  constructor(program) {
    this.program = program
  }

  execute() {
    const scanner = new Scanner(this.program)
    const tokens = scanner.scan()
    const parser = new Parser(tokens)
    parser.parse()
    parser.print()
    console.log(parser.eval())
  }
}

const calculator = new Calculator(process.argv[2])
calculator.execute()
