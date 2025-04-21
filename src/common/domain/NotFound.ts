import { CustomError } from 'ts-custom-error'
import type { ErrorMessage } from './ErrorMessage'
import type { MessageError } from './MessageError'

export class NotFound extends CustomError implements MessageError {
  constructor(private errorMessage: ErrorMessage) {
    super(errorMessage.status)
  }

  getMessage(): string {
    return this.errorMessage.message
  }

  getType(): string {
    return this.errorMessage.type || ''
  }
}
