import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

interface Country {
	id?: number;
	name: string;
	flag: string;
	area: number;
	population: number;
}

const COUNTRIES: Country[] = [
	{
		name: 'Mr.Kamal Nishantha',
		flag: '',
		area: 17075200,
		population: 146989754,
	},
	{
		name: 'Mrs.Bhagya Siriwardane',
		flag: '',
		area: 640679,
		population: 64979548,
	},
];

function search(text: string, pipe: PipeTransform): Country[] {
	return COUNTRIES.filter((country) => {
		const term = text.toLowerCase();
		return (
			country.name.toLowerCase().includes(term) ||
			pipe.transform(country.area).includes(term) ||
			pipe.transform(country.population).includes(term)
		);
	});
}

@Component({
  selector: 'app-salary-menegemnt',
  templateUrl: './salary-menegemnt.component.html',
  styleUrls: ['./salary-menegemnt.component.css']
})
export class SalaryMenegemntComponent implements OnInit {

  active = 1;
  countries$!: Observable<Country[]>;
  filter = new FormControl('');

  constructor(pipe: DecimalPipe) { 
    this.countries$ = this.filter.valueChanges.pipe(
			startWith(''),
			map((text) => search(text, pipe)),
		);
  }

  ngOnInit(): void {
  }

}
