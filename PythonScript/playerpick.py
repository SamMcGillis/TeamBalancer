class Player:
    def __init__(self, name, skill):
        self.name = name
        self.skill = skill

    def __str__ (self):   
        return "Name:", name,"| Skill: ", skill
        
class Team:
    def __init__ (self, number):
        self.number = number
        self.players = []
        self.totalskill = 0
    
    def addPlayer(self, player):
        self.players.append(player)

    def totalSkill(self):
        for p in self.players:
            self.totalskill += p.skill
        return self.totalskill

    def __str__(self):
        x = "Team number: %s   Skill rating: %s" % (self.number, self.totalSkill())
        return x
        
def getPlayers():
    players = []
    loop = True

    while loop:
        print("Enter a player name: ")
        name = input()
        
        print("Enter skill level out of 5 for player", name, ":")
        skill = int(input())
        player = Player(name, skill)

        players.append(player)

        print("Do you want to add another player? Y/N")
        choice = input()
        
        if (choice == "Y" or choice == "y"):
            loop = True
        else:
            loop = False

    return players

def getTeams():
    print("Enter the number of teams you would like to have: ")
    numberteams = int(input())
    i = 1
    teams = []
    while i <= numberteams:
        tnumber = i
        team = Team(tnumber)
        teams.append(team)
        i += 1
    
    return teams

def sortPlayers(players):
    sortedplayers = sorted(players, key = lambda i: i.skill)
    return sortedplayers 

def makeTeams(players, teams):
    j = 0
    k = 0

    while k < len(players):
        currentplayer = players[k]
        teams[j].addPlayer(currentplayer)

        if j < len(teams) - 1:
            j += 1
        else:
            j = 0 
        k += 1
    
    return teams


players = getPlayers()
teams = getTeams()

sortedplayers = sortPlayers(players)
finalteams = makeTeams(sortedplayers, teams)

for t in finalteams:
    print (t)
