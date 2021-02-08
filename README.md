# QVoteZilliqaContract :fire:
Quadratic Voting smart contracts for Zilliqa

# Contracts :scroll:
Contracts are located in: /contract

There are 2 contracts:
- DecisionQueue.scilla (a queue for storing contract addresses)
- QVoting.scilla (quadratic voting logic)

# Tests :hammer:
To run tests:
- Run the scilla-server docker container on localhost:4000 (get it using: https://github.com/Zilliqa/ceres)


Then run:

```bash
npm run test
```









# Our Research:
# INTEGRATING TOKENS 

ZRC-2 https://github.com/Zilliqa/ZRC/blob/master/zrcs/zrc-2.md

## WHAT WE KNOW 

### without spending tokens what we know 
- there is no built in scilla operation to get the balance of an address 

- tokens are handled by some smart contract. We can send a transaction to this smart contract to get the balance.
problem is that zrc2 standard (as well as gzil implementation at https://viewblock.io/zilliqa/address/zil14pzuzq6v6pmmmrfjhczywguu0e97djepxt8g3e?txsType=token-contract&specific=zil14pzuzq6v6pmmmrfjhczywguu0e97djepxt8g3e&tab=code) does not a have a balance getter for some address. this means we have to read the state of the smart contract. CAN THIS BE DONE FROM A TRANSACTION SENT BY A SMART CONTRACT? highly doubt it

- we could have people send us their gzil, we issue QVote credits, and give back the gzil.

## WHAT WE WANT TO KNOW 
- in general, how does it work with sending / accepting tokens from / to a smart contract? had the same question a year ago with baseblock. 

- what happens if you don't accept some amount sent in a transaction? does it get lost, or does it stays to the sender? if this is the case we're good for issuing the credits, we just verify the amount and don't accept. how do we stop double spending in this case though? 



## OTHER OPTIONS / IDEAS	
- we could have people send their gzil to vote, get them back at the end of the election. How do we solve multiple concurrent elections in this case? all the elections are stored in a single contract, this way the balances are global. or perhaps we have a bank contract that temporarily hold the gzil and balances of the users. The individual election contracts can call a transition from this contract and get / verify the balances.  

- making it partly centralized 

- use some trusted oracle to access external api 
chainlink adapter: https://github.com/thodges-gh/CL-JSONRPC-EA
another oracle: https://github.com/TEEXIO/Tora-Zilliqa
# Credit checking - preventing double voting 

## Centralized oracle 
When users register they are simply added to a list. Right before the election starts the server checks the balances of each of these users and then owner account registers them - bam magic 

## Real thing - access to contract states within scilla
- When the user registers the contract gives him some amount of credits based on his current balance. When the user votes the contract checks they still hold the same amount of token. 

- when the users register the contract adds them to a registered list. as soon as the first person votes, all the balances are updated. this is safe, and doesn't need checking for credits twice for each user because the assignment happens in the voting timeframe, once the register timeframe has already ended. A cleaner way would be simply to automatically retreive and assign all the balances as soon as the registration period ends. Don't think this is possible though without a centralized server telling the contract to do this at the right time: taking the first voter as a signal should work the same. 

## Decentralized oracle
- Same as real thing but balance is checked by calling oracle 

