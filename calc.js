const Scanner = require('./scanner')

class Calculator {
  constructor(program) {
    this.program = program
  }

  execute() {
    const scanner = new Scanner(this.program)
    console.log(scanner.scan())
  }
}

const calculator = new Calculator(process.argv[2])
calculator.execute()
