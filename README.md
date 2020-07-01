# Start development environment
1. Install dependencies 

    > npm i
2. Create `.env` file next to `.env.example`. Then copy everything inside
`.env.example` and paste it in `.env`, then replace all values.

3. Run migration scripts
This script will run all migration scripts in this order:
    - triggers
    - schema
    - seeds
    
    > npm run migrate:all

4. Start dev server along all its dependencies (postgres, redis, etc...)
    > docker-compose up

# Tests
- Run unit tests
> npm run ut

- Run unit tests (watch mode)
> npm run ut:watch


# Production
### Compile and run
> npm start

### Just compile
> npm run tsc
