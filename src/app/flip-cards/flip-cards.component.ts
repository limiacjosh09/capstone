import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flip-cards',
  templateUrl: './flip-cards.component.html',
  styleUrls: ['./flip-cards.component.scss']
})
export class FlipCardsComponent {


  constructor(private router: Router) {}

  backPage() {
    this.router.navigate(['/play']);
  }

  cards = [
    { question: "According to their strengths", answer: "Basi keng sikanan." },
    { question: "Can you repeat?", answer: "Malyari ye pung pasibayuan?" },
    { question: "I’ll make sure.", answer: "Bitasan ku na." },
    { question: "Sorry", answer: "Panupaya" },
    { question: "I’m not feeling well.", answer: "Masakit ku panamdaman" },
    { question: "Let’s have a discussion.", answer: "Pisabyan taya." },
    { question: "I’ll accompany you.", answer: "Antabayanan dakayu." },
    { question: "Can you lower your voices?", answer: "Malyaring bawasnan ye pu ing sigla yu." },
    { question: "Excuse me.", answer: "Panupaya yu pu." },
    { question: "Can you move your cart?", answer: "Ilele tayang bagya ing garitun yu." },
    { question: "I’ll forgive you.", answer: "Patawaran da ka" },
    { question: "Borrow something else.", answer: "Mandam naka mung aliwa." },
    { question: "So I can prepare myself.", answer: "Para makasadya ku." },
    { question: "Next time.", answer: "Keng tutuki." },
    { question: "Tell me first if you want to use it.", answer: "Sabian mu pa nung buri meng gamitin." },
    { question: "Let me know.", answer: "Pabalu mu pa kanaku." },
    { question: "I’ll help them.", answer: "Sopan ku nala" },
    { question: "I can handle it.", answer: "Agyu ke pu." },
    { question: "Thank you for your feedback.", answer: "Salamat keng kekang pakibat." },
    { question: "I’ll revisit it.", answer: "Balikan ke pu." },
    { question: "I’ll politely clarify.", answer: "Masalese kung ustan." },
    { question: "Guide them properly.", answer: "Antabayanan ta lang masalese." },
    { question: "I learn so much.", answer: "Dakal ku pu abalu." },
    { question: "It’s very interesting.", answer: "Makawili ya." },
    { question: "Thank you for your advice.", answer: "Salamat pu king payu." },
    { question: "Let’s divide the tasks.", answer: "Pipitna-pitna tamu ing obra." },
    { question: "I don’t want to get involved.", answer: "Eku buring miyabe ken." },
    { question: "I’ll try to answer.", answer: "Subukan ke pu pakibatan." },
    { question: "I don’t know the answer.", answer: "Eku pu balu ing pakibat." },
    { question: "I’ll review the lesson.", answer: "Magsulit ku pu keng lesson." },
    { question: "I really don’t know.", answer: "Ali ku tagana balu." },
    { question: "There was heavy traffic.", answer: "Metrapik pu." },
    { question: "I woke up late.", answer: "Talwi ku pu migising." },
    { question: "I don’t have a valid reason.", answer: "Ala kung mayap a sangkan." },
    { question: "I wasn’t focused.", answer: "Eku makatuun keng gagawan." },
    { question: "I was zoning out.", answer: "Makamulala ku." },
    { question: "I don’t know.", answer: "Eku pu balu." },
    { question: "Follow the majority.", answer: "Tukyan ing kerakalan." },
    { question: "Let’s vote.", answer: "Bumótu tamu." },
    { question: "Let’s support them.", answer: "Suportan tala." },
    { question: "All of you will decide.", answer: "Ikayu ngan matul." },
    { question: "I can help.", answer: "Malyari da kayu sopan." },
    { question: "I’m not sure.", answer: "Ali ku pu siguradu." },
    { question: "Let’s move to another spot.", answer: "Lumipat kata aliwang lugal." },
    { question: "Let’s inform the librarian.", answer: "Ipabalu tamu keng librarian." },
    { question: "They might get mad.", answer: "Pota mimua la." },
    { question: "Let’s just ignore them.", answer: "E tala papansinan." },
    { question: "Maybe you didn’t notice.", answer: "Siguru pu akalimbatawan yu." },
    { question: "There might be an error.", answer: "Pota atin mali." },
    { question: "Please move to the side.", answer: "Malyari pu bang mag lele." },
    { question: "I’ll inform the authorities.", answer: "Ipabalu ku kareng awtorídad." },
    { question: "How much do you need?", answer: "Magkanu pu ing kailangan yu?" },
    { question: "Maybe it’s not much.", answer: "Baka pu ali naman dakal." },
    { question: "I would let you borrow.", answer: "Pandaman da kayu." },
    { question: "Don’t borrow my things.", answer: "E naka mandám." },
    { question: "I don’t care.", answer: "Ala kung pakialam." },
    { question: "You should have told me.", answer: "Dapot sinabi yung tambing kaku." },
    { question: "I wouldn’t have minded.", answer: "Eku sa pekaisipan." },
    { question: "Just do whatever you want.", answer: "Gawan mu namu ing lubi mu." },
    { question: "Nothing would have been broken.", answer: "Ala sa mesirâ." },


];



  flippedCards: boolean[] = new Array(this.cards.length).fill(false);
  currentPage = 0;
  itemsPerPage = 12; 
  totalPages = Math.ceil(this.cards.length / this.itemsPerPage);

  get paginatedCards() {
    const startIndex = this.currentPage * this.itemsPerPage;
    return this.cards.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
  unflipAll() {
    this.flippedCards.fill(false);
  }

  onCardClick(index: number) {
    const actualIndex = index + this.currentPage * this.itemsPerPage;
    this.flippedCards[actualIndex] = !this.flippedCards[actualIndex];
  }


}
