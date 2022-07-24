import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import abi from "../constants/TokenFarm_abi.json"
import { ethers } from "ethers"

const TOKEN_FARM_CONTRACT_ADDRESS = "0xCB157CA76f07F61988FfaFF272eb3BbAA8B94Bd6"
let CURRENT_TOKEN_ADDRESS = ""



export default function Stake() {

    const { isWeb3Enabled } = useMoralis()
    const [userTotalValue, setUserTotalValue] = useState("undefined")
    const [tokenValue, setTokenValue] = useState([])
    const approvedTokens = {}
    // Stake to contract
    // const { runContractFunction: stakeTokens } = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: "0xCB157CA76f07F61988FfaFF272eb3BbAA8B94Bd6",
    //     functionName: "stakeTokens",
    //     params: {},
    //     msgValue: "10000000000000000",
    // })

    // View Functions //
    
    // getUserTotalValue()
    const { runContractFunction: getUserTotalValue
    } = useWeb3Contract({
        abi: abi,
        contractAddress: "0xCB157CA76f07F61988FfaFF272eb3BbAA8B94Bd6",
        functionName: "getUserTotalValue",
        params: {_user: "0xf81ee6A9CE219B296619e6332521ebC64A8B6C8E"},
    })
    
    // GetTokenValue()
    const { 
        runContractFunction: getTokenValue
    } = useWeb3Contract({
        abi: abi,
        contractAddress: TOKEN_FARM_CONTRACT_ADDRESS,
        functionName: "getTokenValue",
        params: {_token: CURRENT_TOKEN_ADDRESS},
        // params: {_token: "0xb01B218f021E9151c61eCEA3173361BbbE9eA346"},
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
                    setUserTotalValue(userTotalValueFromCall)
                    if (userTotalValueFromCall == undefined) {
                        setUserTotalValue("{UNDEFINED}")
                    }
                    // var price = 0
                    // var decimals = 0
                    // const priceAndDecimals = await getTokenPriceFeed("0xb01B218f021E9151c61eCEA3173361BbbE9eA346") (
                    //     price,
                    //     decimals,
                    // )
                    // console.log(priceAndDecimals)
                    CURRENT_TOKEN_ADDRESS = 0xb01B218f021E9151c61eCEA3173361BbbE9eA346
                    approvedTokens.address = 0xb01B218f021E9151c61eCEA3173361BbbE9eA346
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
                    You have {userTotalValue} tokens staked
                    You have {tokenValue[0]} token value
                </h4>
            </div>
            <button 
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={async () => {
                    await stakeTokens()
                }}
            >Stake Tokens</button>
        </div>
    )
}