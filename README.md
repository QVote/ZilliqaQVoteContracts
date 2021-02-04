# QVoteZilliqaContract
Quadratic Voting smart contracts for Zilliqa


# Credit checking - preventing double voting 

## Centralized oracle 
When users register they are simply added to a list. Right before the election starts the server checks the balances of each of these users and then owner account registers them - bam magic 

## Real thing - access to contract states within scilla
- When the user registers the contract gives him some amount of credits based on his current balance. When the user votes the contract checks they still hold the same amount of token. 

- when the users register the contract adds them to a registered list. as soon as the first person votes, all the balances are updated. this is safe, and doesn't need checking for credits twice for each user because the assignment happens in the voting timeframe, once the register timeframe has already ended. A cleaner way would be simply to automatically retreive and assign all the balances as soon as the registration period ends. Don't think this is possible though without a centralized server telling the contract to do this at the right time: taking the first voter as a signal should work the same. 

## Decentralized oracle
- Same as real thing but balance is checked by calling oracle 


