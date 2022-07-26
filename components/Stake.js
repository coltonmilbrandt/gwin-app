import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
// BE SURE to put "{ }" around abi
import { abi } from "../constants/TokenFarm_abi"
import { MockDaiAbi } from "../constants/MockDai_abi"
import { ethers, utils } from "ethers"

const TOKEN_FARM_CONTRACT_ADDRESS = "0x48efFEBe8879A7024654dda2d90F1EF56b12f135"
let CURRENT_TOKEN_ADDRESS = "0x7F27377d72ba8c92f3fB3E1880Efc5583bD7f8Ab"



export default function Stake() {

    const { isWeb3Enabled, user } = useMoralis()
    const [userTotalValue, setUserTotalValue] = useState()
    const [tokenValue, setTokenValue] = useState([])
    const approvedTokens = {}
    // Stake to contract
    // WE NEED
    // 1. Approve the token
        // address
        // abi
        // chainId
    const { runContractFunction: approveErc20 } = useWeb3Contract({
        abi: MockDaiAbi,
        contractAddress: "0xe1F284B9FB056cbF75A92c9b879594d1C74Fa7b9",
        functionName: "approve",
        params: {
            spender: "0x48efFEBe8879A7024654dda2d90F1EF56b12f135",
            amount: "1000000000000000000",
        },
    })
    // 2. Call the Staking function
        // address
        // abi
        // amount
        // token address
    const { runContractFunction: stakeTokens } = useWeb3Contract({
        abi: abi,
        contractAddress: "0x48efFEBe8879A7024654dda2d90F1EF56b12f135",
        functionName: "stakeTokens",
        params: {
            _amount: "1000000000000000000",
            _token: "0xe1F284B9FB056cbF75A92c9b879594d1C74Fa7b9",
        },
    })

    // View Functions //
    
    // getUserTotalValue()
    const { runContractFunction: getUserTotalValue
    } = useWeb3Contract({
        abi: abi,
        contractAddress: "0x48efFEBe8879A7024654dda2d90F1EF56b12f135",
        functionName: "getUserTotalValue",
        params: {
            _user: "0x3789F5efFb5022DEF4Fbc14d325e946c7B422eE3"
        },
    })
    
    // GetTokenValue()
    const { 
        runContractFunction: getTokenValue
    } = useWeb3Contract({
        abi: abi,
        contractAddress: "0x48efFEBe8879A7024654dda2d90F1EF56b12f135",
        functionName: "getTokenValue",
        params: {_token: "0xe1F284B9FB056cbF75A92c9b879594d1C74Fa7b9"},
    })

    // const getTokenPriceFeed = async (address) => {
    //     try {
    //         console.log("Running getTokenPriceFeed()...")
    //         CURRENT_TOKEN_ADDRESS = address
    //         var price
    //         var decimals
    //         const tokenValueFromCall = await getTokenValue(
    //             price,
    //             decimals,
    //         )
    //         price = tokenValueFromCall[0].toString()
    //         decimals = tokenValueFromCall[1].toString()
    //         CURRENT_TOKEN_ADDRESS = ""
    //         return price, decimals
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }

    // This means that any time, any variable in here changes, run this function
    useEffect(() => {
        if(isWeb3Enabled){
            async function updateUI() {
                try {

                    console.log("Running userTotalValue()...")
                    const userTotalValueFromCall = await getUserTotalValue()
                    console.log("User total value returned: " + userTotalValueFromCall)
                    var readableUserTotalValue = userTotalValueFromCall / Math.pow(10, 18)
                    setUserTotalValue(readableUserTotalValue)
                    // if (userTotalValueFromCall == undefined) {
                    //     setUserTotalValue("{UNDEFINED}")
                    // }

                    console.log("Running getTokenValue()...")
                    const tokenValueFromCall = await getTokenValue()
                    console.log("Token value returned: " + tokenValueFromCall)
                    var readableValue = BigInt(tokenValueFromCall[0]).toString()
                    readableValue = readableValue / Math.pow(10, tokenValueFromCall[1])
                    console.log(tokenValue)
                    console.log(readableValue)
                    setTokenValue(readableValue)
                    // var price = 0
                    // var decimals = 0
                    // const priceAndDecimals = await getTokenPriceFeed("0xb01B218f021E9151c61eCEA3173361BbbE9eA346") (
                    //     price,
                    //     decimals,
                    // )
                    // console.log(priceAndDecimals)
                } catch (err) {
                    console.error(err)
                }
            }
            if (isWeb3Enabled) {
                updateUI()
            }
        }
    }, [isWeb3Enabled])

    return (
        
        <div>
            <div className="grid grid-cols-3 text-gray-900 pb-4">
                <div className="bg-[#4E5166] p-4 rounded-md text-gray-100">
                Data
                </div>
            </div>
            <div>
                <h4>
                    <>
                        You have ${userTotalValue} total staked
                        Each token is worth ${tokenValue} 
                    </>
                </h4>
            </div>
            <button 
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={async () => {
                    await approveErc20()
                }}
            >Approve Token</button>
            <button 
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={async () => {
                    await stakeTokens()
                }}
            >Stake Token</button>
        </div>
    )
}