# One On One
One On One is a slack bot that randomly pairs up individuals within a channel for one-on-one's to help them get to know each other.

![ono_1](https://user-images.githubusercontent.com/13951154/221757821-73df41b6-2f62-4b1f-8237-c1309b50e800.gif)

Once installed, invite the One-On-One to any channel to get started. One-On-One will only pair individuals in channels that it has been invited to and can run concurrently on multiple channels. The first pairing by default is set to be generated 7 days from the day that One-On-One was invited to a channel.

One-On-One comes with six commands that can be run by anyone who is in a channel that One-On-One has been invited to. Commands are anonymous and private and the results of them are only visible to the individual who initiated the command:

<code>/ono-frequency [days]</code> - Input a number to set your desired frequency of days between pairings. Based on the number of days, One-On-One will selectively include/exclude you in upcoming pairings based on your desired frequency of pairings.

<code>/ono-block [@user1 @user2...]</code> - Tag a user or multiple users that you wish to block from upcoming pairings. This allows individuals to selectively block users that they do not want to be paired with for as long as the user is in the individual's block list.

<code>/ono-unblock [all OR @user1 @user2...]</code> - Tag a user or multiple users that you wish to remove from your block list. Alternatively, you can input 'all' to completely empty your block list.

<code>/ono-inactive</code> - Run this command to set yourself as inactive for pairing in the channel. Run this command if you would like to take a break from pairings in a channel or just want to lurk in the channel and watch others get paired without participating yourself.

<code>/ono-active</code> - Run this command to set yourself as active for pairing in the channel. By default you are set as active when One-On-One joins a channel you are part of.

<code>/ono-status</code> - Run this command to get a current summary of all of the above parameters including your active status, frequency of pairings, last pairing date, next pairing date and current block list.
