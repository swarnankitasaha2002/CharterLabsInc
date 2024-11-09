import {Transfer} from '../generated/schema';
import {Transfer as TransferEvent} from '../generated/USDC/USDC';
import {BigInt} from '@graphprotocol/graph-ts';

const TARGET_ADDRESS = "<TARGET_ETH_ADDRESS>";

export function handleTransfer(event: TransferEvent): void {
  if (event.params.to.toHex() == TARGET_ADDRESS) {
    let transfer = new Transfer(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
    transfer.from = event.params.from;
    transfer.to = event.params.to;
    transfer.value = event.params.value;
    transfer.timestamp = event.block.timestamp;
    transfer.save();
  }
}
