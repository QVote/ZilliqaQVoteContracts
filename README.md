# QVoteZilliqaContract :fire:
Quadratic Voting smart contracts for Zilliqa

# Contracts :scroll:
Contracts are located in: /contract

There are 2 contracts:
- DecisionQueue.scilla (a queue for storing contract addresses)
- QVoting.scilla (quadratic voting logic)

### QVoting
This is the real quadratic voting contract. Each contract represents one decision. This gets populated with options at creation. Rigth after creation the registration period starts, during which voters sign up to vote and receive their credits, based on the token set in the contract (CHECK NOTE BELOW). Once the registation period is over, the voting starts. Casting your vote is done by calling the `vote` transition, which will check your balance again, making sure you didn't move your tokens (you can't move tokens to a new account and register twice...) (again, CHECK NOTE BELOW). 

### DecisionQueue
This smart contract is simply a reference to the 'n latest' decision smart contracts. The contracts referenced here get posted on the web app (which doesn't exist right now). If you want to create an election and NOT have it be displayed on the web app, don't register it in the queue. 


# Tests :hammer:
To run tests:
- Run the scilla-server docker container on localhost:4000 (get it using: https://github.com/Zilliqa/ceres)

Then run:

```bash
npm run test
```

## NOTE 
Currently the credit distribution is not decetralized. The contracts rely on the owner calling the `owner_register` transition. To do this in a decentralized manner we would need to access the token's contract balance from scilla, which currently isn't, but soon will, be supported. 
This means the `register` transition right now is simply for users to 'sign up' for the election. They will receive their credit balance as soon as the registration period is over and the election starts. 
