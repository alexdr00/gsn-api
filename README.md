# Start development environment
1. Create `.env` file next to `.env.example`. Then copy everything inside
`.env.example` and paste it in `.env`, then replace all values.

2. Run migration scripts
This script will run all migration scripts in this order:
    - triggers
    - schema
    - seeds
    
    Note: Make sure the container is running while executing the migrations.
    
    > docker exec -it gsn-api npm run migrate:all

3. Start dev server along all its dependencies (postgres, redis, etc...)
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
