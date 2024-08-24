let index = 0;
const limit = 50;

document.addEventListener('DOMContentLoaded', () => {
    const pokeCardTemplate = document.getElementById('pokeCard');
    if (!pokeCardTemplate) {
        console.error('Template element not found');
        return;
    }

    const pokemonTemplate = Handlebars.compile(pokeCardTemplate.innerHTML);

    async function fetchCharacter(index) {
        try {
          const response = await fetch(`https://gsi.fly.dev/characters/${index + 1}`);
          const data = await response.json();
      
          console.log('Data fetched from API:', data);
      
          if (!data.result) {
            console.error('No result found in the API response.');
            return;
          }
      
          const mediaResponse = await fetch(`https://gsi.fly.dev/characters/${index + 1}/media`);
          const mediaData = await mediaResponse.json();
      
          const character = {
            id: data.result.id,
            name: data.result.name,
            rarity: data.result.rarity,
            weapon: data.result.weapon,
            vision: data.result.vision,
            wiki_url: data.result.wiki_url,
            region: data.result.region.join(', '),
            affiliation: data.result.affiliation.join(', '),
            birthday: data.result.birthday,
            release_day: new Date(data.result.release_day).toLocaleDateString(),
            special_dish: data.result.special_dish,
            constellation: data.result.constellation,
            title: data.result.title.join(', '),
            how_to_obtain: data.result.how_to_obtain.join(', '),
            videos: mediaData.result.videos
          };
      
          console.log('Character object:', character);
      
          const html = pokemonTemplate({ characters: [character] });
      
          console.log('Generated HTML:', html);
      
          document.getElementById('characterContainer').innerHTML = html;
      
          console.log('HTML injected into container');
        } catch (error) {
          console.error('Error fetching characters:', error);
        }
      }

    fetchCharacter(index);

    document.getElementById('right').addEventListener('click', () => {
        index = (index + 1) % (limit + 1);
        fetchCharacter(index);
    });

    document.getElementById('left').addEventListener('click', () => {
        index = (index - 1 + limit + 1) % (limit + 1);
        fetchCharacter(index);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loading").style.display = "block";
  });
  

window.addEventListener("load", function() {
    document.getElementById("loading").style.display = "none";
  });