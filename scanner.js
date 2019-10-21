const tokens = require('./tokenTypes')
const Token = require('./token')

module.exports = class Scanner {
  constructor(source = '1 + 3') {
    this.tokens = []
    this.source = source
    this.start = 0
    this.current = 0
  }

  scan() {
    scanLoop: while (this.current < this.source.length) {
      this.start = this.current
      const character = this.advance()
      for (const [tokenType, regex] of Object.entries(tokens)) {
        if (character.match(regex)) {
          if (tokenType === 'SPACE') {
            // Don't generate tokens for empty space
          } else if (tokenType === 'NUMBER') {
            const numberMatch = this.source.slice(this.start, this.current).match(regex)
            if (numberMatch) {
              const lexeme = numberMatch[0]
              this.tokens.push(new Token(tokenType, lexeme, parseFloat(lexeme)))
              this.start += lexeme.length
              this.current = this.start
            } else {
              // track some kind of error
            }
          } else {
            this.tokens.push(new Token(tokenType, character, null))
          }
          continue scanLoop
        }
      }
    }
    return this.tokens
  }

  advance() {
    return this.source[this.current++]
  }

  peek() {
    return this.source[this.current]
  }

  isAtEnd() {
    return this.current >= this.source.length
  }
}
